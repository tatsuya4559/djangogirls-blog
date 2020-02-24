from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView

from .forms import CommentForm, PostForm
from .models import Comment, Post


def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by("published_date")
    return render(request, "blog/post_list.html", {"posts": posts})


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, "blog/post_detail.html", {"post": post})


class NewPostView(TemplateView):
    @method_decorator(login_required)
    def get(self, request):
        form = PostForm()
        return render(request, "blog/post_edit.html", {"form": form})

    @method_decorator(login_required)
    def post(self, request):
        form = PostForm(request.POST)
        if not form.is_valid():
            return render(request, "blog/post_edit.html", {"form": form})

        post = form.save(commit=False)
        post.author = request.user
        post.save()
        return redirect("post_detail", pk=post.pk)


class EditPostView(TemplateView):
    @method_decorator(login_required)
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        form = PostForm(instance=post)
        return render(request, "blog/post_edit.html", {"form": form})

    @method_decorator(login_required)
    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        form = PostForm(request.POST, instance=post)
        if not form.is_valid():
            return render(request, "blog/post_edit.html", {"form": form})
        post = form.save(commit=False)
        post.author = request.user
        post.save()
        return redirect("post_detail", pk=post.pk)


@login_required
def post_draft_list(request):
    posts = Post.objects.filter(published_date__isnull=True).order_by("created_date")
    return render(request, "blog/post_draft_list.html", {"posts": posts})


@login_required
def post_publish(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.publish()
    return redirect("post_detail", pk=pk)


@login_required
def post_remove(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return redirect("post_list")


class AddCommentToPostView(TemplateView):
    def get(self, request, pk):
        form = CommentForm()
        return render(request, "blog/add_comment_to_post.html", {"form": form})

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        form = CommentForm(request.POST)
        if not form.is_valid():
            return render(request, "blog/add_comment_to_post.html", {"form": form})
        comment = form.save(commit=False)
        comment.post = post
        comment.save()
        return redirect("post_detail", pk=pk)


@login_required
def comment_approve(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    comment.approve()
    return redirect("post_detail", pk=comment.post.pk)


@login_required
def comment_remove(request, pk):
    comment = get_object_or_404(Comment, pk=pk)
    comment.delete()
    return redirect("post_detail", pk=comment.post.pk)
