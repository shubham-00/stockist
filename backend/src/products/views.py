from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product
from companies.models import Company


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_view(request):
    # user validation
    if not request.user.profile.company:
        return Response({"error": "Access denied!"})

    # data validation
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        product = Product(**serializer.validated_data)
        product.company = request.user.profile.company
        product.current = product.opening
        product.save()
        return Response(serializer.validated_data)

    else:
        return Response(serializer.errors)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_view(request):
    # user validation
    if not request.user.profile.company:
        return Response({"error": "Access denied!"})

    # company and product validation
    product = None
    queryset = Product.objects.filter(pk=request.data.get("pk"), company=request.user.profile.company)
    if queryset.exists():
        product = queryset.first()
    else:
        return Response({"error": "Access Denied!"})

    # data validation
    serializer = ProductSerializer(instance=product, data=request.data)
    if serializer.is_valid():
        # product.name = serializer.validated_data.get("name")
        # product.description = serializer.validated_data.get("description")
        # product.opening = serializer.validated_data.get("opening")
        # product.unit = serializer.validated_data.get("unit")
        # product.save()
        serializer.save()
        return Response(serializer.data)

    else:
        return Response(serializer.errors)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def list_view(request):
    # user validation
    if not request.user.profile.company:
        return Response({"error": "Access denied!"})

    # data validation
    queryset = Product.objects.filter(company=request.user.profile.company)
    serializer = ProductSerializer(instance=queryset, many=True)
    return Response(serializer.data)
