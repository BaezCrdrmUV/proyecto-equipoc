import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,ManyToOne,JoinColumn,PrimaryColumn,OneToOne} from "typeorm";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";
import {ArchivoPortada} from "./ArchivoPortada";
@Entity("datosarchivosdecanciones")
export class ArchivoCancion extends BaseEntity{
    constructor(){
        super();
    
        this.fkIdEstatus = 1;
        
    }
   
    @PrimaryColumn("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    id:string
    @Column("varchar",{length:200})
    fkIdCancion :string
    @Column("varchar",{length:200,nullable:true})
    fkIdPortada:string
    @Column("varchar",{length:200})
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    nombreDelArchivo:string
    @Column("int",{unsigned:true})
    @IsNotEmpty()
    @IsNumber()
    tamanoEnMb:number 
    @Column("varchar",{length:200})
    @IsNotEmpty()
    @Length(3,10)
    formato:string
    @Column("varchar",{length:12})
    @IsNotEmpty()
    codigoIsrc :string
    @Column("longtext")
    @IsNotEmpty()
    urlCancion:string
    @Column("longtext")
    @IsNotEmpty()
    urlPublicaCancion:string
    @Column("int",{unsigned:true,nullable:true,default:1 ,comment:"estado del registro 1 activo 2 inactivo"})
    @IsNumber()
    fkIdEstatus:number

    @OneToOne(() => ArchivoPortada)
    @JoinColumn()
    portada: ArchivoPortada;

}
