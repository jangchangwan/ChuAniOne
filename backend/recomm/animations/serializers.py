from rest_framework import serializers
from .models import Animation


class AnimationSerializer(serializers.ModelSerializer):

    class Meta:
        # the model 4 Serializer
        model = Animation
        # a tuple of field names to be included in the serialization
        fields = ("id", "series_id", "name", "content", "content_rating", "genres", "tags", "highlight_video", "images", "avg_rating", "air_year_quarter", "distributed_air_time", "author", "production", "is_adult", "is_ending")
