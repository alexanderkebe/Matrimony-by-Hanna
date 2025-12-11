"use client"

import { CertificateCard } from "@/components/certificates/certificate-card"
import { mockCertificates } from "@/lib/mock-data"
import { Award, Search, Filter, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/lib/i18n/context"

export default function AdminCertificatesPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "verified" | "pending">("all")

  // Filter certificates
  const filteredCertificates = mockCertificates.filter((cert) => {
    const matchesSearch =
      cert.coupleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "verified" && cert.isVerified) ||
      (filterStatus === "pending" && !cert.isVerified)

    return matchesSearch && matchesFilter
  })

  const verifiedCount = mockCertificates.filter((cert) => cert.isVerified).length
  const pendingCount = mockCertificates.filter((cert) => !cert.isVerified).length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">{t("certificates.adminTitle")}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">{t("certificates.adminDescription")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">{t("certificates.totalCertificates")}</p>
              <p className="text-xl sm:text-2xl font-semibold text-foreground">{mockCertificates.length}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">{t("certificates.verified")}</p>
              <p className="text-xl sm:text-2xl font-semibold text-foreground">{verifiedCount}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">{t("certificates.pendingVerification")}</p>
              <p className="text-xl sm:text-2xl font-semibold text-foreground">{pendingCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              placeholder={t("certificates.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
              className="text-xs sm:text-sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "verified" ? "default" : "outline"}
              onClick={() => setFilterStatus("verified")}
              size="sm"
              className="text-xs sm:text-sm"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {t("certificates.verified")}
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
              size="sm"
              className="text-xs sm:text-sm"
            >
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {t("certificates.pending")}
            </Button>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate, idx) => (
            <CertificateCard key={certificate.id} certificate={certificate} isAdmin={true} delay={idx * 50} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-3xl p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{t("certificates.noCertificatesFound")}</h3>
          <p className="text-muted-foreground">
            {searchQuery || filterStatus !== "all"
              ? t("certificates.tryAdjustingSearch")
              : t("certificates.noCertificatesIssued")}
          </p>
        </div>
      )}

      {/* Verification Instructions */}
      {pendingCount > 0 && (
        <div className="glass rounded-3xl p-6 border-l-4 border-yellow-500/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{t("certificates.pendingVerifications")}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t("certificates.verifyInstructions", { count: pendingCount.toString() })}
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                  <span>{t("certificates.verifyAllLessonsCompleted")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                  <span>{t("certificates.checkCourseRequirements")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                  <span>{t("certificates.clickVerifyButton")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

