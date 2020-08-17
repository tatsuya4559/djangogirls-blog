from django import forms

from blog.models import Post, Comment


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = (
            "title",
            "text",
        )


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = (
            "author",
            "text",
        )


class GetPostsForm(forms.Form):
    start_index = forms.IntegerField(required=False, min_value=0)
    size = forms.IntegerField(required=False, min_value=1)

    def clean_start_index(self):
        start_index = self.cleaned_data.get("start_index")
        if not start_index:
            return 0 # by default
        return start_index

    def clean_size(self):
        size = self.cleaned_data.get("size")
        if not size:
            return 10 # by default
        return size
