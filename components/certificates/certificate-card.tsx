"use client"

import { Certificate } from "@/lib/mock-data"
import { Award, Download, CheckCircle, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/context"
import Image from "next/image"

interface CertificateCardProps {
  certificate: Certificate
  isAdmin?: boolean
  delay?: number
}

export function CertificateCard({ certificate, isAdmin = false, delay = 0 }: CertificateCardProps) {
  const { t } = useTranslation()
  const isVerified = certificate.isVerified

  return (
    <div className="glass rounded-3xl overflow-hidden animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {/* Certificate Header */}
      <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden">
        {certificate.imageUrl ? (
          <>
            <Image
              src={certificate.imageUrl}
              alt={`${certificate.coupleName} - ${certificate.courseTitle} Certificate`}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-16 h-16 text-primary" />
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 z-10">
          {isVerified ? (
            <Badge className="bg-primary text-primary-foreground">
              <CheckCircle className="w-3 h-3 mr-1" />
              {t("certificates.verified")}
            </Badge>
          ) : (
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-background/90">
              <Clock className="w-3 h-3 mr-1" />
              {t("certificates.pending")}
            </Badge>
          )}
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">{certificate.courseTitle}</h3>
          <p className="text-sm text-muted-foreground mt-1">Certificate of Completion</p>
        </div>

        <div className="space-y-2 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("certificates.certificateNumber")}</span>
            <span className="font-mono text-xs font-medium text-foreground">{certificate.certificateNumber}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {t("certificates.issuedDate")}
            </span>
            <span className="text-foreground">
              {new Date(certificate.issuedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          {isAdmin && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Couple</span>
              <span className="text-foreground font-medium">{certificate.coupleName}</span>
            </div>
          )}
          {isVerified && certificate.verifiedBy && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("certificates.verifiedBy")}</span>
              <span className="text-foreground">{certificate.verifiedBy}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {certificate.imageUrl && (
            <Button 
              variant="outline" 
              className="flex-1" 
              size="sm"
              asChild
            >
              <a 
                href={certificate.imageUrl} 
                download={`${certificate.coupleName}-${certificate.courseTitle}-Certificate.png`}
              >
                <Download className="w-4 h-4 mr-2" />
                {t("certificates.download")}
              </a>
            </Button>
          )}
          {isAdmin && !isVerified && (
            <Button className="flex-1" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              {t("certificates.verify")}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

