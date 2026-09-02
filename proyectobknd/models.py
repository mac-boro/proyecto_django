from django.db import models

# Create your models here.
from django.db import models


class Lector(models.Model):
    apellidoP = models.CharField(max_length=50)
    apellidoM = models.CharField(max_length=50)
    nombres = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidoP} {self.apellidoM}"


class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    isbn = models.CharField(max_length=20, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo


class Autor(models.Model):
    pseudonimo = models.CharField(max_length=100)
    fNacimiento = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.pseudonimo


class Editorial(models.Model):
    nombre = models.CharField(max_length=100)
    fechaCreacion = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Prestamo(models.Model):
    codLector = models.ForeignKey(
        Lector, on_delete=models.RESTRICT, related_name='prestamos')
    codLibro = models.ForeignKey(
        Libro, on_delete=models.RESTRICT, related_name='prestamos')
    fechaDev = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Préstamo ID {self.id} - Libro: {self.codLibro.titulo} a {self.codLector.nombres}"


class LibroAutor(models.Model):
    codLibro = models.ForeignKey(
        Libro, on_delete=models.CASCADE, related_name='autores_rel')
    codAutor = models.ForeignKey(
        Autor, on_delete=models.CASCADE, related_name='libros_rel')
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('codLibro', 'codAutor')

    def __str__(self):
        return f"{self.codLibro.titulo} - {self.codAutor.pseudonimo}"


class LibroEditorial(models.Model):
    codLibro = models.ForeignKey(
        Libro, on_delete=models.CASCADE, related_name='editoriales_rel')
    codEditorial = models.ForeignKey(
        Editorial, on_delete=models.CASCADE, related_name='libros_rel')
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('codLibro', 'codEditorial')

    def __str__(self):
        return f"{self.codLibro.titulo} - {self.codEditorial.nombre}"
