import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,ManyToOne,JoinColumn,PrimaryColumn} from "typeorm";
import {Album} from "./Album";
@Entity("canciones")
export class Cancion extends BaseEntity{

    public constructor(){
        super();
        this.fkIdEstatus = 1;

    }
    
    @PrimaryColumn("varchar",{length:200})
    id:string
    @Column("varchar",{length:200})
    fkIdAlbum :number
    @Column("varchar",{length:200})
    titulo:string
    @Column("int",{unsigned:true})
    numeroDeTrack:number 
    @Column("varchar",{length:200})
    genero:string
    @Column("int",{unsigned:true,comment:"duracion en segundos de la cancion"})
    duracion :number
    @Column("tinyint",{unsigned:true,width:2})
    contenidoExplicito:number
    @Column("int",{unsigned:true,nullable:true,default:1 ,comment:"estado del registro 1 activo 2 inactivo"})
    fkIdEstatus:number

    @ManyToOne((type) => Album, (album) => album.canciones)
    album: Album;

}
