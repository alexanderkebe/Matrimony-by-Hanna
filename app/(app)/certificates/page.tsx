"use client"

import { CertificateCard } from "@/components/certificates/certificate-card"
import { mockCertificates, mockCouple } from "@/lib/mock-data"
import { Award, Trophy, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/i18n/context"

export default function CertificatesPage() {
  const { t } = useTranslation()
  
  // Filter certificates for current couple
  const userCertificates = mockCertificates.filter((cert) => cert.coupleId === mockCouple.id)
  const verifiedCount = userCertificates.filter((cert) => cert.isVerified).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">{t("certificates.myCertificates")}</h1>
        <p className="text-muted-foreground mt-1">{t("certificates.viewDownload")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 animate-fade-in-up delay-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{t("certificates.totalCertificates")}</p>
              <p className="text-2xl font-semibold text-foreground">{userCertificates.length}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 animate-fade-in-up delay-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{t("certificates.verified")}</p>
              <p className="text-2xl font-semibold text-foreground">{verifiedCount}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 animate-fade-in-up delay-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{t("certificates.pending")}</p>
              <p className="text-2xl font-semibold text-foreground">{userCertificates.length - verifiedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {userCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCertificates.map((certificate, idx) => (
            <CertificateCard key={certificate.id} certificate={certificate} delay={idx * 100} isAdmin={false} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-3xl p-12 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{t("certificates.noCertificatesYet")}</h3>
          <p className="text-muted-foreground mb-6">
            {t("certificates.completeCourseToEarn")}
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="glass rounded-3xl p-6 animate-fade-in-up">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{t("certificates.aboutCertificates")}</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{t("certificates.issuedUponCompletion")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{t("certificates.verifiedByAdmins")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{t("certificates.downloadAsPDF")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{t("certificates.uniqueCertificateNumber")}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

