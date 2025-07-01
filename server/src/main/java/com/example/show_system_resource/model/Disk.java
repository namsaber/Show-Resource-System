package com.example.show_system_resource.model;

public class Disk {
    private String name;
    private long total;
    private long free;
    private long used;

    public Disk(String name, long total, long free, long used) {
        this.name = name;
        this.total = total;
        this.free = free;
        this.used = used;
    }

    public Disk() {
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getFree() {
        return free;
    }

    public void setFree(long free) {
        this.free = free;
    }

    public long getUsed() {
        return used;
    }

    public void setUsed(long used) {
        this.used = used;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
