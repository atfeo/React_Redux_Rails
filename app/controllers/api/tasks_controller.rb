class Api::TasksController < ApplicationController
  def index
    @tasks = Task.all
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render :show, status: :created
    else
      head :unprocessable_entity
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.assign_attributes(task_params)
    if @task.save
      render :show, status: :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def task_params
    params.permit(:name, :isComplete)
  end
end
