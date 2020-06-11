from django.http.response import JsonResponse
from django.utils import timezone

from blog.models import Post


def posts(request):
    start_index = int(request.GET.get("start_index") or 0)
    size = int(request.GET.get("size") or 10)
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by(
        "published_date"
    )
    return JsonResponse(
        {
            "posts": [post.as_dict() for post in posts[start_index: start_index + size]],
            "total": len(posts),
        }
    )
