'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import useCart from '@/hooks/use-cart';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define the form schema. This will be used to validate the form values.
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),
  address: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(20, { message: 'Name must be less than 50 characters.' }),
  zipCode: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(6, { message: 'Name must be less than 50 characters.' }),
  city: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(20, { message: 'Name must be less than 50 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),
  phone: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(10, { message: 'Name must be less than 50 characters.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  const items = useCart((state) => state.items);

  const productNames = items.map(function (item) {
    return { product: item.name };
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      zipCode: '',
      city: '',
      email: '',
      phone: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      setLoading(true);
      const productsIds = items.map(function (item) {
        return { productId: item.id };
      });

      const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
      }, 0);

      const address = `${values.address}, ${values.zipCode} ${values.city}`;

      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address,
        totalPrice,
        orderItems: productsIds,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        data,
      );

      toast.success('Order completed.');
      setSubmitted(true);
    } catch (error) {
      toast.error('Something went wrong. Order not completed.');
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-4">
      {!submitted ? (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 col-span-2 col-start-2">
          <h3 className="text-xl font-semibold mb-8">
            Payment and delivery information
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Costumer name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={loading}
                        placeholder="E-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        disabled={loading}
                        placeholder="Costumer name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Street name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Zip code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-6 bg-gray-400">Make order</Button>
            </form>
          </Form>
        </div>
      ) : (
        <div>
          <h1>Order completed</h1>
          <h2>Products ordered:</h2>
          {productNames.map(function (product) {
            return (
              <div key={product.product}>
                <p>{product.product}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
