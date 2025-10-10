import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';
import ContactForm from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us - Get In Touch',
  description: 'Get in touch with us for web development, design services, or any inquiries. We\'re here to help bring your ideas to life.',
  keywords: ['contact', 'web development', 'design', 'inquiry', 'get in touch'],
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@example.com',
      link: 'mailto:hello@example.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon to Fri from 9am to 6pm',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: 'Dhaka, Bangladesh',
      link: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      description: 'Our support team is available',
      value: 'Mon - Fri: 9:00 - 18:00',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a project in mind or want to learn more about our services? 
              We'd love to hear from you and discuss how we can help bring your ideas to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Let's Talk</h2>
                <p className="text-muted-foreground mb-8">
                  We're here to answer any questions you may have about our services. 
                  Reach out to us and we'll respond as soon as we can.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                          {item.link !== '#' ? (
                            <Link 
                              href={item.link} 
                              className="text-sm text-primary hover:underline font-medium"
                            >
                              {item.value}
                            </Link>
                          ) : (
                            <span className="text-sm font-medium">{item.value}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {[
                      { name: 'GitHub', url: 'https://github.com' },
                      { name: 'LinkedIn', url: 'https://linkedin.com' },
                      { name: 'Twitter', url: 'https://twitter.com' }
                    ].map((social, index) => (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <Link href={social.url} target="_blank" rel="noopener noreferrer">
                          {social.name}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Can't find the answer you're looking for? Reach out to our customer support team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity, but most websites take 4-8 weeks from start to finish."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer various support packages to help maintain and update your website after launch."
              },
              {
                question: "What technologies do you work with?",
                answer: "We specialize in modern technologies including Next.js, React, Node.js, MongoDB, and Tailwind CSS."
              },
              {
                question: "Can you work with existing designs?",
                answer: "Absolutely! We can work with your existing designs or create new ones based on your requirements."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}