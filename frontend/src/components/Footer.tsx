import { SiFacebook, SiX, SiInstagram } from 'react-icons/si';
import { MdMail, MdPhone } from 'react-icons/md';
import {Link} from "@tanstack/react-router";

const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/courses' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
];

const socialLinks = [
    { name: 'Facebook', icon: SiFacebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: SiX, href: 'https://twitter.com' },
    { name: 'Instagram', icon: SiInstagram, href: 'https://instagram.com' },
];

export default function Footer() {
    return (
        <footer className="bg-footer-color text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Edu Consultancy</h2>
                        <p className="mb-4">Empowering students to achieve their academic goals and build successful futures.</p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit our ${link.name} page`}
                                >
                                    <link.icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic">
                            <p className="mb-2">123 Education Street</p>
                            <p className="mb-2">Knowledge City, LE 12345</p>
                            <p className="flex items-center mb-2">
                                <MdPhone className="h-5 w-5 mr-2" />
                                <a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">+1 (123) 456-7890</a>
                            </p>
                            <p className="flex items-center">
                                <MdMail className="h-5 w-5 mr-2" />
                                <a href="mailto:info@educonsultancy.com" className="text-gray-400 hover:text-white transition-colors">info@educonsultancy.com</a>
                            </p>
                        </address>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Edu Consultancy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
