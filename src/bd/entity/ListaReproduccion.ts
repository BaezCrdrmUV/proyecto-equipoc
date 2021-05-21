import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,OneToMany,ManyToOne,PrimaryColumn} from "typeorm";
import { usuariobd } from "../../config/global";
import {Cancion} from "./Cancion";
@Entity("ListaReproduccion")
export class ListaReproduccion extends BaseEntity {
 
    
    @PrimaryColumn("varchar",{length:200,nullable:false})
    id: string;

    @Column("varchar",{length:200,nullable:false})
    fkIdUsuario :string;
    
    @Column("varchar",{length:200,nullable:false})
    nombre: string;

    @Column("int",{unsigned:true,nullable:false})
    numeroDeTracks :number;

       
    @Column("int",{unsigned:true,
		          nullable:false,
                   default:1
                  })
    fkIdEstatus: number;


    @OneToMany((type) => Cancion, (cancion) => cancion.id)
    canciones: Cancion[];
    

   
}