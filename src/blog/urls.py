from django.urls import path
import blog.views as views
import blog.api as api

urlpatterns = [
    # views
    path("", views.post_list, name="post_list"),
    path("post/<int:pk>/", views.post_detail, name="post_detail"),
    path("post/new/", views.NewPostView.as_view(), name="post_new"),
    path("post/<int:pk>/edit/", views.EditPostView.as_view(), name="post_edit"),
    path("drafts/", views.post_draft_list, name="post_draft_list"),
    path("post/<int:pk>/publish", views.post_publish, name="post_publish"),
    path("post/<int:pk>/remove/", views.post_remove, name="post_remove"),
    path("post/<int:pk>/comment", views.AddCommentToPostView.as_view(), name="add_comment_to_post"),
    path("comment/<int:pk>/approve/", views.comment_approve, name="comment_approve"),
    path("comment/<int:pk>/remove/", views.comment_remove, name="comment_remove"),
    path("posts/", views.posts, name="posts"),

    # api
    path("api/posts/", api.posts, name="api_posts"),
]
