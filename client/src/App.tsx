import { useState, useEffect } from 'react'

import CPUChart from './components/CPUChart'
import DiskChart from './components/DiskChart'
import RamChart from './components/RAMChart'

const App = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const API_URL = 'http://localhost:8080/api/system-info';

  const fetchSystemInfo = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setSystemInfo(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  }

  useEffect(() => {
    fetchSystemInfo();
    const interval = setInterval(() => {
      fetchSystemInfo();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Giám sát tài nguyên hệ thống
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {systemInfo ? (
          <>
            <RamChart ramInfo={systemInfo.ram} />
            <CPUChart cpuInfo={systemInfo.cpu} />
            {systemInfo.disk && systemInfo.disk.map((disk, index) => (
              <DiskChart key={index} diskInfo={disk} />
            ))}
          </>
        ) : (
          <p className="text-lg text-gray-600">Đang kết nối đến server và lấy dữ liệu...</p>
        )}
      </div>
    </div>
  )
}

export default App