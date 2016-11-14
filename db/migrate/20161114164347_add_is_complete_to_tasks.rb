class AddIsCompleteToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :isComplete, :boolean, default: false
  end
end
