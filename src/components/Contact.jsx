import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, Copy, Check } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        message: ''
    });
    const [copied, setCopied] = useState(false);

    // YOUR_EMAIL_HERE
    const myEmail = "hakankekec554@gmail.com";

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolyo İletişim: ${formData.name}`);
        const body = encodeURIComponent(formData.message);
        const mailtoUrl = `mailto:${myEmail}?subject=${subject}&body=${body}`;

        window.location.href = mailtoUrl;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(myEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-tech-blue focus:ring-1 focus:ring-tech-blue/50 focus:shadow-[0_0_20px_rgba(0,210,255,0.2)]";

    return (
        <section id="contact" className="section-padding relative overflow-hidden bg-space-void">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter mb-4">
                        İLETİŞİM <span className="text-tech-blue">KUR</span>
                    </h2>
                    <div className="w-20 h-1 bg-tech-blue mx-auto mb-8 shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Contact Logic Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-nirvana p-8 md:p-10 rounded-[40px] border-white/5 shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-tech-blue/60 ml-2">İsim Soyisim</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Adınız nedir?"
                                        className={`${inputClasses} pl-14`}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-tech-blue/60 ml-2">Mesajınız</label>
                                <div className="relative">
                                    <MessageSquare size={18} className="absolute left-6 top-6 text-white/20" />
                                    <textarea
                                        required
                                        rows="5"
                                        placeholder="Bana ne söylemek istersin?"
                                        className={`${inputClasses} pl-14 resize-none`}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn-universe btn-universe-lg w-full"
                            >
                                <strong className="flex items-center gap-3">
                                    <Send size={18} />
                                    Mesajı Işınla
                                </strong>
                                <div className="btn-universe-stars">
                                    <div className="stars-layer"></div>
                                </div>
                                <div className="btn-universe-glow">
                                    <div className="btn-universe-circle"></div>
                                    <div className="btn-universe-circle"></div>
                                </div>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Fallback */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8 py-4"
                    >
                        <div className="space-y-4">
                            <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tight">VİZYONU GERÇEĞE DÖNÜŞTÜRELİM</h3>
                            <p className="text-white/60 leading-relaxed font-medium">
                                Yeni bir proje, iş birliği veya sadece selam vermek için bana ulaşın. Her zaman ilginç fikirleri konuşmaya hazırım.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 group hover:border-tech-blue/30 transition-all duration-500">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-tech-blue/10 flex items-center justify-center border border-tech-blue/20 group-hover:scale-110 transition-transform">
                                        <Mail className="text-tech-blue" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-1">Doğrudan E-Posta</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-bold tracking-tight">{myEmail}</span>
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-tech-blue"
                                                title="Kopyala"
                                            >
                                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-tech-blue/40">
                                <div className="w-2 h-2 rounded-full bg-tech-blue animate-pulse" />
                                <span className="text-[10px] uppercase tracking-[0.6em] font-black">7/24 Aktif Haberleşme</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
