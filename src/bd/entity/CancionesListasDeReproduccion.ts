import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,OneToMany, PrimaryColumn,ManyToOne} from "typeorm";
import {Cancion} from "./Cancion";
import {ListaReproduccion} from "./ListaReproduccion";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";

@Entity("cancioneslistasdereproduccion")
export class CancionesListasDeReproduccion extends BaseEntity {
 
    
    @PrimaryColumn("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    id: string;

    @IsNotEmpty()
    @Length(36,200)
    fkIdCancion: string;

    @Column("varchar",{length:200
                      ,comment:"nombre artistico"
                      })
  
    @IsNotEmpty()
    @Length(36,200)
    fkIdListaDeReproduccion: string;

  
    @IsNumber()
    fkIdEstatus: number;


   
   
}

