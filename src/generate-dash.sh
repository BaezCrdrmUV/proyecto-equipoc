#!/bin/bash

bitrates=()
outputFiles=()
#se obtiene el segundo parametro de la llamada a exec el cual contiene 
#la ruta del artista y el album de la cancion
#que se va a convertir
dir=$1
inidir=$PWD

#nos posicionamos en el directorio del artista y album de la cancion a convertir
cd "$dir"
#creamos el directorio dash donde se guardaran los sementos de la cancion
mkdir "dash"
echo $dir
# Get audio bit rate
bit_rate=$(ffprobe -v quiet -print_format json -show_format original.mp3 | grep bit_rate | grep -o '[0-9]\+')

if (( $bit_rate >= 128000 ))
then
    bitrates+=("128k")
    outputFiles+=("128.m4a")
fi

if (( $bit_rate >= 192000 ))
then
    bitrates+=("192k")
    outputFiles+=("192.m4a")
fi

if (( $bit_rate >= 256000 ))
then
    bitrates+=("256k")
    outputFiles+=("256.m4a")
fi

if (( $bit_rate >= 320000 ))
then
    bitrates+=("320k")
    outputFiles+=("320.m4a")
fi

max=${#bitrates[@]}
max=$((max - 1))

for i in `seq 0 ${max}`
do
    echo "[ffmpeg] Converting to" ${outputFiles[$i]}
    ffmpeg -y -loglevel panic -i original.mp3 -vn -c:a aac -strict -2 -b:a ${bitrates[$i]} ${outputFiles[$i]}
    echo "convertido"
    #ffmepeg  hace conversion a determinados formatos, en este caso esta convirtiendo el mp3 a uno con codec aac a cada uno de los bitrates disponibles
    #-y para que cuando se creen los archivos convertidos sobre escriba sin preguntar
    #-log level indica el tipo de errores que deben mostrarse en el log por consola(o donde sea que se mande el log)
    #panic indica que los errores mandados al log deben ser los de nivel panic, osea los que causan crasheo de ffmpeg
    #-i indoca que el parametro que sigue es un archivo de entrada
    #origininal.mp3 archivo de entrada
    #-vn filtra streams del archivo de salida, -vn indica que el el archivo de salida no debe incluirse el video
    # c:a  es el stream specifier, la c indica que estamos configurando un codec, la a indica que se cofigura el codec de audio del archivo de salida
    #el : solo es parte de la sintaxis
    #aac es el codec de audio al que lo esta convirtiendo
    #-strict no se
    # -2 no se pero se ha de relacionar con el -strict
    # -b:a es el stream specificier indicando que se estaconfigurando el bitrate del stream de audio. b es el birate y a es audio

done

echo "fragmentando..."
MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_%s_ -out dash/index ${outputFiles[@]}
echo "fragmentacion completa"

# Delete files generated by ffmpeg
echo "borrando archivos"
for f in ${outputFiles[@]}
do
    echo "borrando archivo" ${f}
    rm -f $f
done

cd "$inidir"
