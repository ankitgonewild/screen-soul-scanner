
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (image: HTMLImageElement) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          onImageSelect(img);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-muted rounded-lg">
      <ImageIcon className="w-12 h-12 text-muted-foreground" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Upload an image to detect emotions
        </p>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="secondary" className="cursor-pointer" asChild>
            <span>Choose Image</span>
          </Button>
        </label>
      </div>
    </div>
  );
};
