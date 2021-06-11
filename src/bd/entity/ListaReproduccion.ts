import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,OneToMany,ManyToOne,PrimaryColumn} from "typeorm";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";
import { usuariobd } from "../../config/global";
import {CancionesListasDeReproduccion} from "./CancionesListasDeReproduccion";
@Entity("listasdereproduccion")
export class ListaReproduccion extends BaseEntity {
 
    
    @PrimaryColumn("varchar",{length:200,nullable:false})
    @IsNotEmpty()
    id: string;

    @Column("varchar",{length:200,nullable:false})
    @IsNotEmpty()
    fkIdUsuario :string;
    
    @Column("varchar",{length:200,nullable:false})
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    nombre: string;

    @Column("int",{unsigned:true,nullable:false})
    @IsNotEmpty()
    @IsNumber()
    numeroDeTracks :number;

       
    @Column("int",{unsigned:true,
		          nullable:false,
                   default:1
                  })
    fkIdEstatus: number;


  
    

   
}