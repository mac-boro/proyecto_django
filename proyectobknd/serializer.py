from rest_framework import serializers
from .models import Lector
from .models import Autor
from .models import Libro
from .models import Editorial
from .models import Prestamo
from .models import LibroAutor
from .models import LibroEditorial

class LectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lector
        fields = '__all__'
        # fields = ('fullname','languaje','is_active’) acá podemos traer cualquier atributo del modelo o campo.
        # con la opción de '__all__' nos traemos todo para ver y tener acceso a todo el registro de cada programador.

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor 
        fields = '__all__'

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = '__all__'

class EditorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Editorial
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'

class LibroAutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibroAutor
        fields = '__all__'

class LibroEditorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibroEditorial
        fields = '__all__'