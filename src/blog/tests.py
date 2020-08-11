from django.test import TestCase

# Create your tests here.
class Test(TestCase):
    def setUp(self):
        pass

    def test_ok(self):
        self.assertEqual(1, 1)
