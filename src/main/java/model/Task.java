package model;

public class Task {

    public static final int TASK_TO_DO = 1;
    public static final int TASK_DOING = 2;
    public static final int TASK_DONE = 3;

    private int id;
    private String name;
    private String description;
    private String date;
    private int state;

    public Task() {}

    public Task(int id, String name, String description, String date, int state) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
