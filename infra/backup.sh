#!/usr/bin/env bash

# ==============================================================================
# MD TechKanpur — Automated Codebase & Configuration Backup Script
# ==============================================================================
# Implements Gzip-compressed archiving, timestamped backup logs, 
# and a 30-day rotation/retention policy. Set this to run via cron daily.
# Cron Example: 0 2 * * * /var/www/mdtechkanpur/infra/backup.sh > /dev/null 2>&1
# ==============================================================================

# 1. Configuration Settings
PROJECT_DIR="/var/www/mdtechkanpur" # Path to your website root directory
BACKUP_DIR="/var/www/mdtechkanpur/backups" # Path to store secure backups
LOG_FILE="/var/www/mdtechkanpur/backups/backup.log"
RETENTION_DAYS=30

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="mdtechkanpur_backup_${TIMESTAMP}.tar.gz"
BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"

# Ensure Backup Directory exists
mkdir -p "${BACKUP_DIR}"

# 2. Setup Logging Utility
log_message() {
    local LEVEL="$1"
    local MSG="$2"
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] [${LEVEL}] : ${MSG}" | tee -a "${LOG_FILE}"
}

log_message "INFO" "=========================================="
log_message "INFO" "Starting secure automated backup sequence..."

# 3. Perform Compress / Archive Operations
# We exclude node_modules, .git, and local dev logs to keep archive size lightweight
log_message "INFO" "Archiving codebase files from: ${PROJECT_DIR}"
tar --exclude="node_modules" \
    --exclude=".git" \
    --exclude="backups" \
    --exclude="backend/logs/*.log" \
    -czf "${BACKUP_PATH}" -C "${PROJECT_DIR}" . 2>> "${LOG_FILE}"

if [ $? -eq 0 ]; then
    FILE_SIZE=$(du -h "${BACKUP_PATH}" | cut -f1)
    log_message "SUCCESS" "Backup archive created successfully."
    log_message "SUCCESS" "Archive Path: ${BACKUP_PATH} [Size: ${FILE_SIZE}]"
    
    # Securing the backup file (restricting read/write solely to owner)
    chmod 600 "${BACKUP_PATH}"
    log_message "INFO" "Restricted file permissions set to 600 (owner read-write only) for: ${BACKUP_NAME}"
else
    log_message "ERROR" "Backup compression failed! Check tar stderr above."
    exit 1
fi

# 4. Implement Retention / Rotation Policy (Keep last 30 backups)
log_message "INFO" "Enforcing backup retention policy (keeping last ${RETENTION_DAYS} days of archives)..."

# Finding and listing files older than RETENTION_DAYS
DELETED_COUNT=0
mapfile -t OLD_BACKUPS < <(find "${BACKUP_DIR}" -name "mdtechkanpur_backup_*.tar.gz" -type f -mtime +${RETENTION_DAYS})

for file in "${OLD_BACKUPS[@]}"; do
    log_message "INFO" "Removing expired backup file: $(basename "${file}")"
    rm -f "${file}"
    DELETED_COUNT=$((DELETED_COUNT + 1))
done

log_message "INFO" "Retention check complete. Expired archives pruned: ${DELETED_COUNT}"
log_message "INFO" "Backup sequence complete."
log_message "INFO" "=========================================="
exit 0
