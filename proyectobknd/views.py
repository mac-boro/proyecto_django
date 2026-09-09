from django.shortcuts import render
from rest_framework import viewsets
from .serializer import LectorSerializer
from .serializer import AutorSerializer
from .serializer import LibroSerializer
from .serializer import EditorialSerializer
from .serializer import PrestamoSerializer
from .serializer import LibroAutorSerializer
from .serializer import LibroEditorialSerializer
from .models import Lector
from .models import Autor
from .models import Libro
from .models import Editorial
from .models import Prestamo
from .models import LibroAutor
from .models import LibroEditorial

# Create your views here.
class LectorViewSet(viewsets.ModelViewSet):
    queryset = Lector.objects.all()  # acá creamos una consulta o QUERY a nuestra tabla, trayendo todos los campos como un objeto.
    serializer_class = LectorSerializer # Agregamos la clase ProgrammerSerializer que ya tiene el modelo serializado para mostrar.

class AutorViewSet(viewsets.ModelViewSet):
    queryset = Autor.objects.all()  
    serializer_class = AutorSerializer 

class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()  
    serializer_class = LibroSerializer 

class EditorialViewSet(viewsets.ModelViewSet):
    queryset = Editorial.objects.all()  
    serializer_class = EditorialSerializer 

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()  
    serializer_class = PrestamoSerializer 

class LibroAutorViewSet(viewsets.ModelViewSet):
    queryset = LibroAutor.objects.all()  
    serializer_class = LibroAutorSerializer 

class LibroEditorialViewSet(viewsets.ModelViewSet):
    queryset = LibroEditorial.objects.all()  
    serializer_class = LibroEditorialSerializer    

def inicio(request):
    # Aquí puedes agregar lógica de base de datos si lo necesitas
    # Renderizamos el archivo HTML de tu frontend
    return render(request, 'index.html')

def admin(request):
    # Aquí puedes agregar lógica de base de datos si lo necesitas
    # Renderizamos el archivo HTML de tu frontend
    return render(request, 'admin.html')