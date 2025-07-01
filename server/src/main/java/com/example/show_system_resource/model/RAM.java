package com.example.show_system_resource.model;

public class RAM {
    private long total;
    private long free;
    private long used;

    public RAM(long total, long free, long used) {
        this.total = total;
        this.free = free;
        this.used = used;
    }

    public RAM() {
    }

    public long getUsed() {
        return used;
    }

    public void setUsed(long used) {
        this.used = used;
    }

    public long getFree() {
        return free;
    }

    public void setFree(long free) {
        this.free = free;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
