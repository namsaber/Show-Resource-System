package com.example.show_system_resource.model;

public class CPU {
    private int core;
    private double usedPercent;
    private double availablePercent;

    public CPU(int core, double used, double free) {
        this.core = core;
        this.usedPercent = used;
        this.availablePercent = free;
    }

    public CPU() {
    }

    public int getCore() {
        return core;
    }

    public void setCore(int core) {
        this.core = core;
    }

    public double getUsedPercent() {
        return usedPercent;
    }

    public void setUsedPercent(double usedPercent) {
        this.usedPercent = usedPercent;
    }

    public double getAvailablePercent() {
        return availablePercent;
    }

    public void setAvailablePercent(double availablePercent) {
        this.availablePercent = availablePercent;
    }
}
