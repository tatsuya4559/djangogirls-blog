from django.http.response import JsonResponse, HttpResponseBadRequest
from django.utils import timezone

from blog import models
from blog import forms


def get_posts(request):
    form = forms.GetPostsForm(data=request.POST)
    if not form.is_valid():
        return HttpResponseBadRequest()

    start_index = form.cleaned_data["start_index"]
    size = form.cleaned_data["size"]
    requested_range = slice(start_index, start_index + size)

    posts = models.Post.objects.published().order_by("published_date")[requested_range]
    return JsonResponse(
        {
            "posts": [post.as_dict() for post in posts],
            "total": len(posts),
        }
    )
