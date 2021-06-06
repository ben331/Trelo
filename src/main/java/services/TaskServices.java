package services;

import model.Message;
import model.Task;
import providers.TaskProvider;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.ArrayList;

@Path("tasks")
public class TaskServices {

    @GET
    @Path("echo")
    public String echo(){
        return "echo";
    }

    @POST
    @Path("insert")
    @Consumes("application/json")
    public Response insert(Task task){

        try {
            TaskProvider provider = new TaskProvider();
            int id = provider.insertTask(task);
            task.setId(id);
            return Response
                    .ok(task)
                    .header("Content-Type", "application/json")
                    .build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response
                    .status(500)
                    .entity(new Message("Operación Fallida"))
                    .header("Content-Type", "application/json")
                    .build();
        }
    }

    @GET
    @Path("all")
    public Response getTasks(){

        try {
            TaskProvider provider = new TaskProvider();
            ArrayList<Task> tasks = provider.getAllTasks();
            return Response
                    .ok(tasks)
                    .header("Content-Type", "application/json")
                    .build();
        } catch (SQLException e) {
            e.printStackTrace();
            return Response
                    .status(500)
                    .entity(new Message("Operación Fallida"))
                    .header("Content-Type", "application/json")
                    .build();
        }
    }

    @PUT
    @Path("update/{id}/{state}")
    public Response updateTask(@PathParam("id") String id, @PathParam("state") String state){

        try {
            int i = Integer.parseInt(id);
            int s = Integer.parseInt(state);
            TaskProvider provider = new TaskProvider();
            provider.updateStateOfTask(i,s);
            return Response.ok().build();

        } catch (SQLException e) {
            e.printStackTrace();
            return Response
                    .status(500)
                    .entity(new Message("Operación Fallida"))
                    .header("Content-Type", "application/json")
                    .build();
        }
    }

    @DELETE
    @Path("delete/{id}")
    public Response deleteTask(@PathParam("id") String id){

        try {
            int i = Integer.parseInt(id);
            TaskProvider provider = new TaskProvider();
            provider.delete(i);
            return Response.ok().build();

        } catch (SQLException e) {
            e.printStackTrace();
            return Response
                    .status(500)
                    .entity(new Message("Operación Fallida"))
                    .header("Content-Type", "application/json")
                    .build();
        }
    }
}