from django.http.response import JsonResponse
from django.utils import timezone

from blog.models import Post


def posts(request):
    begin = int(request.GET.get("begin") or 0)
    size = int(request.GET.get("size") or 10)
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by(
        "published_date"
    )
    return JsonResponse(
        {"posts": [post.as_dict() for post in posts[begin : begin + size]]}
    )
