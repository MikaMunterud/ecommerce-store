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
import { Order } from '@/types';
import { ProductColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';

// Define the form schema. This will be used to validate the form values.
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least three character.' })
    .max(50, { message: 'Name must be less than 50 characters.' })
    .regex(/^[a-öA-Ö]+ [a-öA-Ö]+$/, {
      message: 'Please enter both first name and last name.',
    }),
  address: z
    .string()
    .min(1, { message: 'Address must be at least one character.' })
    .max(30, { message: 'Address must be less than 30 characters.' })
    .regex(/^((.){1,}(\d){1,}(.){0,})$/, {
      message: 'Address must be valid street and street number.',
    }),
  zipCode: z
    .string()
    .min(1, { message: 'Zip code must be at least one character.' })
    .max(6, { message: 'Zip code must be less than 6 characters.' })
    .regex(/^[0-9]{3}\s?[0-9]{2}$/, {
      message:
        'Zip code must be a valid Swedish zip code of 5 numbers xxxxx or xxx xx.',
    }),
  city: z
    .string()
    .min(1, { message: 'City must be at least one character.' })
    .max(20, { message: 'City must be less than 20 characters.' })
    .regex(/^[a-öA-Ö]*$/, {
      message:
        'City must be valid and cannot contain any special characters or numbers.',
    }),
  email: z
    .string()
    .min(1, { message: 'E-mail must be at least one character.' })
    .max(50, { message: 'E-mail must be less than 50 characters.' })
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: 'E-mail must be a valid e-mail address.',
    }),
  phone: z
    .string()
    .min(1, { message: 'Phone must be at least one character.' })
    .max(10, { message: 'Phone must be less than 10 characters.' })
    .regex(/^(((0{2}?))|0)7[\d]{8}/, {
      message: 'Phone number must be a valid Swedish phone number 07xxxxxxxx.',
    }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderData, setOrderData] = useState({} as Order);
  const [products, setProducts] = useState<ProductColumn[]>([]);
  const [orderId, setOrderId] = useState('' as string);

  const router = useRouter();

  const cart = useCart();

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
    if (cart.items.length === 0) {
      toast.error('Cart is empty.');
      router.push('/cart');
      return;
    }

    try {
      setLoading(true);

      const uniqueItems: string[] = cart.items
        .map((item) => item.id)
        .filter((value, index, self) => self.indexOf(value) === index);

      const orderItems = uniqueItems.map(function (item) {
        const amount = cart.items.filter(function (x) {
          return x.id === item;
        });

        return { productId: item, quantity: amount.length };
      });

      const totalPrice = cart.items.reduce((total, item) => {
        return total + Number(item.price);
      }, 0);

      const address = `${values.address}, ${values.zipCode} ${values.city}`;

      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address,
        totalPrice,
        orderItems,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        data,
      );

      if (response.status !== 201) {
        throw new Error('Something went wrong.');
      }

      const productDetails = uniqueItems.map(function (item) {
        const amount = cart.items.filter(function (x) {
          return x.id === item;
        });

        const productAmount = (amount.length * Number(amount[0].price)).toFixed(
          2,
        );
        return {
          name: amount[0].name,
          price: amount[0].price,
          quantity: amount.length,
          totalPrice: `${productAmount} kr`,
        };
      });

      const { result } = await response.data;

      if (!result) {
        throw new Error('Something went wrong.');
      }

      setOrderData(data);
      setProducts(productDetails);
      setOrderId(result.id);

      toast.success('Order completed.');
      setSubmitted(true);
      cart.removeAll();
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
                        placeholder="Phone number"
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
        <div className="mt-2 rounded-lg px-4 py-6 sm:p-6 col-start-1 col-span-4">
          <h1 className="text-2xl font-bold text-black">Order completed</h1>

          <Separator className="my-8" />

          <div className="grid grid-cols-3 my-4">
            <div className="px-4 sm:p-6 col-start-1 col-span-1 row-start-1">
              <h2 className="text-xl font-bold text-black">
                This order will be shipped to:
              </h2>
              <p>{orderData.name}</p>
              <p>{orderData.address}</p>
            </div>

            <div className="px-4 sm:p-6 col-start-3 col-span-1 row-start-1">
              <h2 className="text-xl font-bold text-black">
                Contact information:
              </h2>
              <p>{orderData.email}</p>
              <p>{orderData.phone}</p>
            </div>

            <div className="px-4 sm:p-6 col-start-3 col-span-2 row-start-2">
              <h2 className="text-xl font-bold text-black">Total price:</h2>
              <p>{`${Number(orderData.totalPrice).toFixed(2)} kr`}</p>
            </div>

            <div className="px-4 sm:p-6 col-start-1 col-span-2 row-start-2">
              <h2 className="text-xl font-bold text-black">Order number:</h2>
              <p>{orderId}</p>
            </div>
          </div>
          <Separator className="my-8" />

          <DataTable
            searchKey="name"
            columns={columns}
            data={products}
            route="products"
            loading={loading}
          />

          <h2 className="text-3xl font-bold text-black mt-8">
            Payment alternatives
          </h2>
          <p className="my-4">
            You can either pay with your preferred payment method upon pickup or
            you can pay with Swish.
          </p>
          <p className="my-4 font-bold">1230563676</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
