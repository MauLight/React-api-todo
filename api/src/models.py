from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Todo(db.Model):
    __tablename__ = 'todo'
    id = db.Column(db.Integer, primary_key = True)
    label = db.Column(db.String(250), nullable = False)
    done = db.Column(db.Boolean, nullable = False)

    def serialize(self):
        return{
            'id': self.id,
            'label': self.label,
            'done': self.done
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()