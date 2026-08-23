import React, { useState, useCallback } from 'react';
import { CVData } from '@/hooks/useCVData';
import styles from '@/app/builder/builder.module.css';
import { User, Upload, X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

export default function PersonalForm({ data, updateData }: { data: CVData, updateData: (d: CVData) => void }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({
      ...data,
      personal: { ...data.personal, [e.target.name]: e.target.value }
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc as string, croppedAreaPixels as any);
      updateData({
        ...data,
        personal: { ...data.personal, photo: croppedImage }
      });
      setImageSrc(null); // Close cropper
    } catch (e) {
      console.error(e);
    }
  };

  const removePhoto = () => {
    updateData({
      ...data,
      personal: { ...data.personal, photo: '' }
    });
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <User size={28} strokeWidth={2.5} />
        Data Diri
      </h2>

      {/* Photo Upload Area */}
      <div className={styles.formGroup}>
        <label>Pas Foto (Opsional)</label>
        {data.personal.photo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <img src={data.personal.photo} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e4e4e7' }} />
            <button 
              type="button" 
              onClick={removePhoto}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', color: '#b91c1c', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
            >
              <X size={16} /> Hapus Foto
            </button>
          </div>
        ) : (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', border: '2px dashed #e4e4e7', borderRadius: '12px', cursor: 'pointer', background: '#fafafa', marginTop: '0.5rem', transition: 'all 0.2s' }}>
            <Upload size={24} color="#a1a1aa" style={{ marginBottom: '0.5rem' }} />
            <span style={{ fontSize: '0.9rem', color: '#71717a', fontWeight: 500 }}>Klik untuk upload foto (1x1)</span>
            <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
          </label>
        )}
      </div>

      {imageSrc && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '400px', background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #f4f4f5', textAlign: 'center', fontWeight: 700, fontSize: '1.1rem', color: '#18181b' }}>
              Sesuaikan Pas Foto
            </div>
            
            <div style={{ position: 'relative', width: '100%', height: '350px', background: '#f4f4f5' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#71717a' }}>Zoom</span>
                <input 
                  type="range" 
                  value={zoom} 
                  min={1} 
                  max={3} 
                  step={0.1} 
                  aria-labelledby="Zoom" 
                  onChange={(e) => setZoom(Number(e.target.value))} 
                  style={{ flex: 1, accentColor: '#8b5cf6' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => setImageSrc(null)} style={{ flex: 1, padding: '0.85rem', border: 'none', background: '#f4f4f5', color: '#18181b', borderRadius: '14px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>Batal</button>
                <button onClick={handleSaveCrop} style={{ flex: 1, padding: '0.85rem', border: 'none', background: '#8b5cf6', color: '#fff', borderRadius: '14px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}>Simpan Foto</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.formGroup}>
        <label>Nama Lengkap&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input name="fullName" className={styles.input} value={data.personal.fullName} onChange={handleChange} placeholder="Contoh: Tubagus Iqbal Husaeni" />
      </div>
      
      <div className={styles.grid2}>
        <div className={styles.formGroup}>
          <label>No. HP / WhatsApp&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <input name="phone" className={styles.input} value={data.personal.phone} onChange={handleChange} placeholder="Contoh: 0812-3456-7890" />
        </div>
        <div className={styles.formGroup}>
          <label>Email&nbsp;<span style={{ color: 'red' }}>*</span></label>
          <input name="email" type="email" className={styles.input} value={data.personal.email} onChange={handleChange} placeholder="Contoh: email@gmail.com" />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Alamat / Domisili&nbsp;<span style={{ color: 'red' }}>*</span></label>
        <input name="address" className={styles.input} value={data.personal.address} onChange={handleChange} placeholder="Contoh: Cikarang, Bekasi, Jawa Barat" />
      </div>
    </div>
  );
}
