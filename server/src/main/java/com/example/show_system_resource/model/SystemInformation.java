package com.example.show_system_resource.model;

import java.util.List;

public class SystemInformation {
    RAM ram;
    CPU cpu;
    List<Disk> disk;

    public SystemInformation(RAM ram, CPU cpu, List<Disk> disk) {
        this.ram = ram;
        this.cpu = cpu;
        this.disk = disk;
    }

    public SystemInformation() {
    }

    public RAM getRam() {
        return ram;
    }

    public void setRam(RAM ram) {
        this.ram = ram;
    }

    public CPU getCpu() {
        return cpu;
    }

    public void setCpu(CPU cpu) {
        this.cpu = cpu;
    }

    public List<Disk> getDisk() {
        return disk;
    }

    public void setDisk(List<Disk> disk) {
        this.disk = disk;
    }
}
