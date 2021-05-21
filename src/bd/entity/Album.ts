import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,OneToMany,ManyToOne,PrimaryColumn} from "typeorm";
import {Artista} from "./Artista";
import {Cancion} from "./Cancion";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";

@Entity("albumes")
export class Album extends BaseEntity {
 
    
    @PrimaryColumn("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    id: string;

    @Column("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    fkIdArtista :string
    
    @Column("varchar",{length:200})
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    titulo: string;

    @Column("int",{unsigned:true,comment:"duracion en segundos de todo el album"})
    @IsNotEmpty()
    @IsNumber()
    duracion :number
    
    @Column("int",{unsigned:true,comment:"duracion en segundos de todo el album"})
    @IsNotEmpty()
    @IsNumber()
    numeroDeTracks :number

    @Column("varchar",{length:200})
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    companiaProductora: string;
    
    @Column("varchar",{length:200,comment:"sencillo,edicion especial,etc."})
    @Matches("^([a-zA-zñ]+\\s{1,3})+[a-zA-Zñ]+\\s{0,3}$")
    tipoDeAlbum: string;

    @Column("int",{nullable:true})
    @IsNumber()
    anoDeLanzamiento: number;
    
    @Column("int",{unsigned:true,
		          nullable:true,
                   default:1
                  })
    @IsNumber()
    fkIdEstatus: number;

    @ManyToOne((type) => Artista, artista => artista.albumes)
    artista:Artista;

    @OneToMany((type) => Cancion, (cancion) => cancion.album)
    canciones: Cancion[];
    

   
}

