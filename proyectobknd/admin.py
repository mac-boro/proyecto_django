from django.contrib import admin
from .models import Lector
from .models import Autor
from .models import Libro
from .models import Editorial
from .models import Prestamo
from .models import LibroAutor
from .models import LibroEditorial

# Register your models here.
admin.site.register(Lector)
admin.site.register(Autor)
admin.site.register(Libro)
admin.site.register(Editorial)
admin.site.register(Prestamo)
admin.site.register(LibroAutor)
admin.site.register(LibroEditorial)