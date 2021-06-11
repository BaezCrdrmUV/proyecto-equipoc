import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,ManyToOne,JoinColumn,PrimaryColumn,OneToMany} from "typeorm";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";
import {Album} from "./Album";
import {CancionesListasDeReproduccion} from "./cancionesListasDeReproduccion";
@Entity("canciones")
export class Cancion extends BaseEntity{

    public constructor(){
        super();
        this.fkIdEstatus = 1;

    }
    
    @PrimaryColumn("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    id:string
    @Column("varchar",{length:200})
    fkIdAlbum :number
    @Column("varchar",{length:200})
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    titulo:string
    @Column("int",{unsigned:true})
    @IsNotEmpty()
    @IsNumber()
    numeroDeTrack:number 
    @Column("varchar",{length:200})
    @IsNotEmpty()
    @Length(1,200)
    genero:string
    @Column("int",{unsigned:true,comment:"duracion en segundos de la cancion"})
    @IsNotEmpty()
    @IsNumber()
    duracion :number
    @Column("tinyint",{unsigned:true,width:2})
    @IsNotEmpty()
    @IsNumber()
    contenidoExplicito:number
    @Column("int",{unsigned:true,nullable:true,default:1 ,comment:"estado del registro 1 activo 2 inactivo"})
    @IsNumber()
    fkIdEstatus:number

    @ManyToOne((type) => Album, (album) => album.canciones)
    album: Album;
    @OneToMany(() => CancionesListasDeReproduccion, cancionesLista => cancionesLista.cancion)
    public cancionesLista!: CancionesListasDeReproduccion[];

}
