using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace MSSuscripcion.Models
{
    public partial class libermusicUsuariosContext : DbContext
    {
        public libermusicUsuariosContext()
        {
        }

        public libermusicUsuariosContext(DbContextOptions<libermusicUsuariosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Contrasena> Contrasenas { get; set; }
        public virtual DbSet<Datosdelocalizacion> Datosdelocalizacions { get; set; }
        public virtual DbSet<Estatusderegistro> Estatusderegistros { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
             
                optionsBuilder.UseMySql(connectionString, Microsoft.EntityFrameworkCore.ServerVersion.FromString("8.0.23-mysql"),
                    builder => {
                        builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
                base.OnConfiguring(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contrasena>(entity =>
            {
                entity.HasKey(e => e.FkIdUsuario)
                    .HasName("PRIMARY");

                entity.ToTable("contrasenas");

                entity.Property(e => e.FkIdUsuario)
                    .HasColumnType("varchar(200)")
                    .HasColumnName("fkIdUsuario")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Contrasena1)
                    .IsRequired()
                    .HasColumnType("varchar(200)")
                    .HasColumnName("contrasena")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(d => d.FkIdUsuarioNavigation)
                    .WithOne(p => p.Contrasena)
                    .HasForeignKey<Contrasena>(d => d.FkIdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_contrasenas_usuarios1");
            });

            modelBuilder.Entity<Datosdelocalizacion>(entity =>
            {
                entity.HasKey(e => e.FkIdUsuario)
                    .HasName("PRIMARY");

                entity.ToTable("datosdelocalizacion");

                entity.HasIndex(e => e.Email, "email_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.FkIdUsuario)
                    .HasColumnType("varchar(200)")
                    .HasColumnName("fkIdUsuario")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(200)")
                    .HasColumnName("email")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasColumnType("varchar(200)")
                    .HasColumnName("pais")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(d => d.FkIdUsuarioNavigation)
                    .WithOne(p => p.Datosdelocalizacion)
                    .HasForeignKey<Datosdelocalizacion>(d => d.FkIdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_datosdelocalizacion_usuarios1");
            });

            modelBuilder.Entity<Estatusderegistro>(entity =>
            {
                entity.ToTable("estatusderegistros");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.NombreDeEstatus)
                    .IsRequired()
                    .HasColumnType("varchar(20)")
                    .HasColumnName("nombreDeEstatus")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuarios");

                entity.HasIndex(e => e.FkidEstatus, "fk_usuarios_EstatusDeRegistros1_idx");

                entity.HasIndex(e => e.NombreDeUsuario, "nombreDeUsuario_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnType("varchar(200)")
                    .HasColumnName("id")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.FkIdArtista).HasColumnName("fkIdArtista");

                entity.Property(e => e.FkidEstatus).HasColumnName("fkidEstatus");

                entity.Property(e => e.NombreDeUsuario)
                    .IsRequired()
                    .HasColumnType("varchar(200)")
                    .HasColumnName("nombreDeUsuario")
                    .HasComment("nombre de usuario(nickname) de la cuenta que se esta creando")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.NombreDelPropietario)
                    .IsRequired()
                    .HasColumnType("varchar(200)")
                    .HasColumnName("nombreDelPropietario")
                    .HasComment("nombre de la persona a quien pertenece la cuenta de usuario")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(d => d.FkidEstatusNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.FkidEstatus)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_usuarios_EstatusDeRegistros1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
