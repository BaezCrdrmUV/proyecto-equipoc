import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,ManyToOne,JoinColumn,PrimaryColumn} from "typeorm";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";

@Entity("datosarchivosdeportadas")
export class ArchivoPortada extends BaseEntity{

    
    @PrimaryColumn("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    id:string
    
    @Column("varchar",{length:200,nullable:true})
    fkIdArtista :string
    
    @Column("varchar",{length:200,nullable:true})
    fkIdAlbum:string
    
    @Column("varchar",{length:200})
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    nombreDeImagen:string
  
    @Column("varchar",{length:200})
    @IsNotEmpty()
    @Length(3,10)
    formato:string
    
    @Column("longtext")
    @IsNotEmpty()
    urlDePortada:string

    @Column("longtext")
    @IsNotEmpty()
    urlPublicaDePortada:string
    
    @Column("int",{unsigned:true,nullable:true,default:1 ,comment:"estado del registro 1 activo 2 inactivo"})
    @IsNumber()
    fkIdEstatus:number

    
}
