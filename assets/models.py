from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=100) #name of the task
    description = models.TextField(blank =  True) # details of the task, its optional
    status = models.CharField(max_length=50, default = 'Pending') # pending, in progress, done
    created_at = models.DateTimeField(auto_now_add =  True) # Automatic timestamp
    
    def __str__(self):
        return self.title