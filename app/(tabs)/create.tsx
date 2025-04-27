import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, X, Image as ImageIcon, MapPin, DollarSign } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { CategoryPill } from '@/components/ui/CategoryPill';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Books',
  'Sports',
  'Toys',
  'Art',
  'Collectibles',
  'Other'
];

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // For demonstration, we'll just set a placeholder image
  const handleAddImage = () => {
    setImageUrl('https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg');
  };
  
  const handleRemoveImage = () => {
    setImageUrl(null);
  };
  
  const handleSubmit = () => {
    // Form validation
    if (!title || !description || !minPrice || !maxPrice || !location || !selectedCategory) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would submit this data to your backend
    console.log({
      title,
      description,
      priceRange: { min: minPrice, max: maxPrice },
      location,
      category: selectedCategory,
      imageUrl,
    });
    
    // Reset form fields
    setTitle('');
    setDescription('');
    setMinPrice('');
    setMaxPrice('');
    setLocation('');
    setSelectedCategory(null);
    setImageUrl(null);
    
    // Show success message or navigate
    alert('Your request has been posted successfully!');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Create Request</Text>
          <Text style={styles.subheader}>
            Tell potential sellers what you're looking for
          </Text>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="What are you looking for?"
              placeholderTextColor={Colors.accent.light}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((category) => (
                <CategoryPill
                  key={category}
                  label={category}
                  isSelected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe what you're looking for in detail..."
              placeholderTextColor={Colors.accent.light}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Price Range</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceInputContainer}>
                <DollarSign size={18} color={Colors.accent.light} style={styles.inputIcon} />
                <TextInput
                  style={styles.priceInput}
                  value={minPrice}
                  onChangeText={setMinPrice}
                  placeholder="Min"
                  placeholderTextColor={Colors.accent.light}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.priceSeparator}>-</Text>
              <View style={styles.priceInputContainer}>
                <DollarSign size={18} color={Colors.accent.light} style={styles.inputIcon} />
                <TextInput
                  style={styles.priceInput}
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  placeholder="Max"
                  placeholderTextColor={Colors.accent.light}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.locationInputContainer}>
              <MapPin size={18} color={Colors.accent.light} style={styles.inputIcon} />
              <TextInput
                style={styles.locationInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Your city, state or neighborhood"
                placeholderTextColor={Colors.accent.light}
              />
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.label}>Add Image (Optional)</Text>
            {imageUrl ? (
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={handleRemoveImage}
                >
                  <X size={20} color={Colors.neutral.white} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={handleAddImage}
              >
                <ImageIcon size={24} color={Colors.accent.light} />
                <Text style={styles.addImageText}>Upload an image</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.submitButtonContainer}>
            <Button
              title="Post My Request"
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Layout.spacing.lg,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.xs,
  },
  subheader: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.light,
    marginBottom: Layout.spacing.xl,
  },
  formSection: {
    marginBottom: Layout.spacing.xl,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.accent.dark,
    marginBottom: Layout.spacing.sm,
  },
  input: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGray,
    padding: Layout.spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.dark,
  },
  textArea: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGray,
    padding: Layout.spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.dark,
    minHeight: 120,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInputContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGray,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.dark,
    paddingLeft: Layout.spacing.xs,
  },
  priceSeparator: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.accent.light,
    marginHorizontal: Layout.spacing.md,
  },
  locationInputContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGray,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.accent.dark,
    paddingLeft: Layout.spacing.xs,
  },
  inputIcon: {
    marginRight: Layout.spacing.xs,
  },
  addImageButton: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGray,
    borderStyle: 'dashed',
    padding: Layout.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.accent.light,
    marginLeft: Layout.spacing.sm,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    marginBottom: Layout.spacing.sm,
  },
  imagePreview: {
    width: '100%',
    height: 200,
  },
  removeImageButton: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonContainer: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xxl,
  },
});