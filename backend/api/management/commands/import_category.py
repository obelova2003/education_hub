import csv

from django.core.management.base import BaseCommand

from api.models import Categories


class Command(BaseCommand):
    def handle(self, *args, **options):
        csv_file2 = open('api/management/commands/categories.csv',
                         encoding='utf-8')
        reader = csv.reader(csv_file2, delimiter=';')
        next(reader, None)
        list_tags = []
        for row in reader:
            print(row)
            category_name, category_description = row
            list_tags.append(Categories(
                category_name=category_name,
                category_description=category_description,))
        Categories.objects.bulk_create(list_tags)
        print('Категории  +')