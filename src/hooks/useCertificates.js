import { useCallback, useState } from 'react';

const CERTIFICATES_STORAGE_KEY = 'app_certificates';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem(CERTIFICATES_STORAGE_KEY) || '[]');
  });

  const addCertificate = useCallback((file, course) => {
    const newCertificate = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      course,
      uploadedAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString()
    };

    const updatedCertificates = [newCertificate, ...certificates];
    setCertificates(updatedCertificates);
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(updatedCertificates));

    return newCertificate;
  }, [certificates]);

  const removeCertificate = useCallback((id) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== id);
    setCertificates(updatedCertificates);
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(updatedCertificates));
  }, [certificates]);

  const getCertificatesByName = useCallback((course) => {
    return certificates.filter(cert => cert.course === course);
  }, [certificates]);

  return {
    certificates,
    addCertificate,
    removeCertificate,
    getCertificatesByName
  };
};
