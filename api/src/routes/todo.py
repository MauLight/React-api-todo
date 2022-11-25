from flask import Blueprint, jsonify, request
from models import Todo

bpTodo = Blueprint('bpTodo', __name__)


@bpTodo.route('/todo', methods=['GET'])
def all_todos():
    todos = Todo.query.all()
    todos = list(map(lambda todo: todo.serialize(), todos))
    return jsonify(todos), 200


@bpTodo.route('/todo/<int:id>', methods=['GET'])
def get_todo_by_id(id):
    todo = Todo.query.get(id)
    return jsonify(todo.serialize()), 200


@bpTodo.route('/todo', methods=['POST'])
def store_todo():
    label = request.json.get('label')
    done = request.json.get('done')

    todo = Todo()
    todo.label = label
    todo.done = done
    todo.save()
    return jsonify(todo.serialize()), 200


@bpTodo.route('/todo/<int:id>/update', methods=['PUT'])
def update_todo(id):
    label = request.json.get('label')
    done = request.json.get('done')

    todo = Todo.query.get(id)
    todo.label = label
    todo.done = done
    todo.save()
    return jsonify(todo.serialize()), 200


@bpTodo.route('/todo/<int:id>/delete', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    todo.delete()
    return jsonify({"message": "todo deleted"}), 200