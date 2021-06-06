package providers;

import db.DBConnection;
import model.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class TaskProvider {

    public int insertTask(Task task) throws SQLException {
        String sql = ("INSERT INTO A00362772tasks(name, description, date, state) VALUES('$NAME', '$DESC', '$DATE', $STATE)")
            .replace("$NAME", task.getName())
            .replace("$DESC", task.getDescription())
            .replace("$DATE", task.getDate())
            .replace("$STATE", task.getState()+"");

        DBConnection connection = new DBConnection();
        connection.connect();
        connection.comandSQL(sql);
        sql = "SELECT MAX(id) AS id FROM A00362772tasks";
        ResultSet resultSet = connection.getDataBySql(sql);
        resultSet.next();
        int last = resultSet.getInt(1);
        connection.disconnect();
        return last;
    }

    public void delete(int id) throws SQLException {
        String sql = ("DELETE FROM A00362772tasks WHERE id = $ID")
                .replace("$ID", "" + id);

        DBConnection connection = new DBConnection();
        connection.connect();
        connection.comandSQL(sql);
        connection.disconnect();
    }

    public void updateStateOfTask(int id, int state) throws SQLException {
        String sql = ("UPDATE A00362772tasks SET state = $STATE WHERE id = $ID")
                .replace("$STATE", "" + state)
                .replace("$ID", ""+id);

        DBConnection connection = new DBConnection();
        connection.connect();
        connection.comandSQL(sql);
        connection.disconnect();
    }

    public ArrayList<Task> getAllTasks() throws SQLException {
        ArrayList<Task> output = new ArrayList<Task>();

        String sql = "SELECT * FROM A00362772tasks";

        DBConnection connection = new DBConnection();
        connection.connect();
        ResultSet resultSet = connection.getDataBySql(sql);

        while(resultSet.next()){
            int id = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String desc = resultSet.getString(3);
            String date = resultSet.getString(4);
            int state = resultSet.getInt(5);

            Task task = new Task(id, name, desc, date, state);
            output.add(task);
        }

        connection.disconnect();
        return output;
    }

    /*
    public ArrayList<Task> getTaskByState(int state) throws SQLException {
        ArrayList<Task> output = new ArrayList<Task>();

        String sql = "SELECT * FROM A00362772tasks WHERE state = "+state;

        DBConnection connection = new DBConnection();
        connection.connect();
        ResultSet resultSet = connection.getDataBySql(sql);

        while(resultSet.next()){
            int id = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String desc = resultSet.getString(3);
            String date = resultSet.getString(4);

            Task task = new Task(id, name, desc, date,state);
            output.add(task);
        }

        connection.disconnect();

        return output;
    }*/
}
