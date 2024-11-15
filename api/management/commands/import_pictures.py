import os
import sys
import zipfile

from django.conf import settings
from django.contrib.auth.models import User
from django.core.files import File
from django.core.management import BaseCommand
from io import BytesIO
from PIL import Image
from api.models.profile import Profile

DATA_ROOT = settings.BASE_DIR / "data/"

class Command(BaseCommand):
    help = "Populates the database with the AI generated profile pictures"

    def resize_image(self, img_path, max_width=256):
        img = Image.open(img_path)

        width_percent = max_width / float(img.size[0])
        new_height = int((float(img.size[1]) * float(width_percent)))

        img = img.resize((max_width, new_height), Image.Resampling.NEAREST)
        img_io = BytesIO()
        img.save(img_io, format='JPEG', quality=85)
        img_io.seek(0)

        return File(img_io, name=os.path.basename(img_path))


    def handle(self, *args, **kwargs):
        files = zipfile.ZipFile(DATA_ROOT / "avatars.zip")
        c = 0
        for filename in files.namelist():
            user_id = int(filename.split('.')[0])
            user = User.objects.get(pk=user_id)
            profile = Profile.objects.get(user=user)
            if (len(profile.bio) > 0):
                data = files.read(filename)
                bindata = BytesIO(data)
                bindata.seek(0)
                profile.avatar.save(filename, File(bindata), save=True)
                c += 1

                sys.stdout.write
                (
                    self.style.SUCCESS
                    (
                        f"Successfully imported {filename} to {user.username}\n"
                    )
                )
                
        
        sys.stdout.write
        (
            self.style.SUCCESS(f"Sucessfully processed {c} profile pictures")
        )