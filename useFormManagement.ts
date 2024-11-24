// hooks/useFormManagement.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { z } from 'zod';

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (values: T, files?: File[]) => Promise<void>;
  resetOnSubmit?: boolean;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useFormManagement<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
  resetOnSubmit = false,
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
  });

  const fileInputRef = useRef<File[]>([]);
  const previousValues = useRef(initialValues);

  // Debounced validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (validationSchema && formState.values !== previousValues.current) {
        try {
          validationSchema.parse(formState.values);
          setFormState(prev => ({ ...prev, errors: {}, isValid: true }));
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors = error.errors.reduce((acc, curr) => ({
              ...acc,
              [curr.path[0]]: curr.message,
            }), {});
            setFormState(prev => ({ ...prev, errors, isValid: false }));
          }
        }
      }
      previousValues.current = formState.values;
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formState.values, validationSchema]);

  const handleChange = useCallback((
    name: keyof T,
    value: any,
    shouldValidate = true
  ) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files) {
      fileInputRef.current = Array.from(files);
    }
  }, []);

  const handleBlur = useCallback((name: keyof T) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      if (validationSchema) {
        validationSchema.parse(formState.values);
      }

      await onSubmit(formState.values, fileInputRef.current);

      if (resetOnSubmit) {
        setFormState({
          values: initialValues,
          errors: {},
          touched: {},
          isSubmitting: false,
          isValid: true,
        });
        fileInputRef.current = [];
      } else {
        setFormState(prev => ({ ...prev, isSubmitting: false }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, curr) => ({
          ...acc,
          [curr.path[0]]: curr.message,
        }), {});
        setFormState(prev => ({
          ...prev,
          errors,
          isValid: false,
          isSubmitting: false,
        }));
      } else {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
        }));
        // Handle other errors
        console.error('Form submission error:', error);
      }
    }
  }, [formState.values, initialValues, onSubmit, resetOnSubmit, validationSchema]);

  const reset = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
    });
    fileInputRef.current = [];
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValid: formState.isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFileChange,
    reset,
  };
}

// Usage example:
const ExampleForm = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFileChange,
  } = useFormManagement({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values, files) => {
      // Handle form submission
      console.log('Form values:', values);
      console.log('Files:', files);
    },
    resetOnSubmit: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
      {touched.email && errors.email && (
        <span className="error">{errors.email}</span>
      )}
      
      {/* Other form fields... */}
      
      <input
        type="file"
        multiple
        onChange={(e) => handleFileChange(e.target.files)}
      />
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};