import {Entity, PrimaryGeneratedColumn, Column,BaseEntity,OneToMany, PrimaryColumn} from "typeorm";
import {Album} from "./Album";
import {min,max,length,Length,Matches,IsNotEmpty,IsFQDN,IsNumber} from "class-validator";

@Entity("artistas")
export class Artista extends BaseEntity {
 
    
    @PrimaryColumn("varchar",{length:200})
    @IsNotEmpty()
    @Length(36,200)
    id: string;

    @Column("varchar",{length:200
                     ,comment:"nombre real del arista"
                      })
    @Matches("^([a-zA-zñ]+\\s{1,3})+[a-zA-Zñ]+\\s{0,3}$")
    nombre: string;

    @Column("varchar",{length:200
                      ,comment:"nombre artistico"
                      })
  
    @Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$")
    nombreArtistico: string;

    @Column("int",{nullable:true})
    anoDeNacimiento: number;

    @Column("longtext")
    @IsNotEmpty()
    @IsFQDN()
    web: string;
    
    @Column("varchar",{length:100})
    @Matches("^([a-zA-zñ]+|([a-zA-zñ]+\\s{1,3})+[a-zA-Zñ]+\\s{0,3})$")
    nacionalidad: string; 

    @Column("int",{ unsigned:true,
	 	            nullable:true,   
                    default:1
                       ,comment:"estado del registro (activo,inactivo)"
                   })
    @IsNumber()
    fkIdEstatus: number;

    

    @OneToMany(type => Album, album => album.artista,{cascade:true})
    albumes: Album[];
    
   
}

