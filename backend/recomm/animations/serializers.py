from numpy import source
from rest_framework import serializers
from .models import Animation, Review, History, Feature


class AnimationSerializer(serializers.ModelSerializer):

    class Meta:
        # the model 4 Serializer
        model = Animation
        # a tuple of field names to be included in the serialization
        fields = ("id", "name", "series_id")


class ReviewSerializer(serializers.ModelSerializer):
    
    member_id = serializers.IntegerField(source="profile")
    ani_id = serializers.IntegerField(source="animation")
    
    class Meta:
        model = Review
        fields = ("member_id", "ani_id", "score")


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = "__all__"


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ("id", "feat_str")
