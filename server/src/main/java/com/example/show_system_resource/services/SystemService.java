package com.example.show_system_resource.services;

import com.example.show_system_resource.model.CPU;
import com.example.show_system_resource.model.Disk;
import com.example.show_system_resource.model.RAM;
import com.example.show_system_resource.model.SystemInformation;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;
import oshi.software.os.OperatingSystem;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SystemService {
    private final SystemInfo systemInfo;
    private final HardwareAbstractionLayer hardware;
    private final OperatingSystem os;

    private long[] prevTicks;
    private long prevTime;

    public SystemService() {
        this.systemInfo = new SystemInfo();
        this.hardware = systemInfo.getHardware();
        this.os = systemInfo.getOperatingSystem();
        this.prevTicks = new long[CentralProcessor.TickType.values().length];
        this.prevTime = System.currentTimeMillis();
    }

    public RAM getRAM() {
        GlobalMemory memory = hardware.getMemory();
        long totalBytes = toGB(memory.getTotal());
        long freeBytes = toGB(memory.getAvailable());
        long usedBytes = totalBytes - freeBytes;
        return new RAM(totalBytes, freeBytes, usedBytes);
    }

    public List<Disk> getDisk() {
        FileSystem fileSystem = os.getFileSystem();
        List<OSFileStore> fileStores = fileSystem.getFileStores();

        return fileStores.stream().map(
                store -> {
                    long totalBytes = toGB(store.getTotalSpace());
                    long usableBytes = toGB(store.getUsableSpace());
                    long usedBytes = totalBytes - usableBytes;

                    return new Disk(store.getName(), totalBytes, usableBytes, usedBytes);
                }).collect(Collectors.toList());
    }

    public CPU getCPU() {
        CentralProcessor processor = hardware.getProcessor();
        int logicalCoreCount = processor.getLogicalProcessorCount();

        long[] ticks = processor.getSystemCpuLoadTicks();
        long idle = ticks[CentralProcessor.TickType.IDLE.getIndex()];
        long nice = ticks[CentralProcessor.TickType.NICE.getIndex()];
        long system = ticks[CentralProcessor.TickType.SYSTEM.getIndex()];
        long user = ticks[CentralProcessor.TickType.USER.getIndex()];
        long iowait = ticks[CentralProcessor.TickType.IOWAIT.getIndex()];
        long irq = ticks[CentralProcessor.TickType.IRQ.getIndex()];
        long softirq = ticks[CentralProcessor.TickType.SOFTIRQ.getIndex()];
        long steal = ticks[CentralProcessor.TickType.STEAL.getIndex()];

        long totalCpu = idle + nice + system + user + iowait + irq + softirq + steal;

        long elapsedTicks = totalCpu - Arrays.stream(prevTicks).sum();
        long idleTicks = idle - prevTicks[CentralProcessor.TickType.IDLE.getIndex()];
        long usedTicks = elapsedTicks - idleTicks;

        double usedPercentage = 0;
        if (elapsedTicks > 0) {
            usedPercentage = (double) usedTicks / elapsedTicks * 100;
        }

        double availablePercentage = 100 - usedPercentage;


        this.prevTicks = ticks;
        this.prevTime = System.currentTimeMillis();

        return new CPU(logicalCoreCount, usedPercentage, availablePercentage);
    }

    public SystemInformation getSystemInfo() {
        return new SystemInformation(getRAM(),getCPU(),getDisk());
    }

    public long toGB(long bytes) {
        return bytes / 1024 / 1024 / 1024;
    }
}
